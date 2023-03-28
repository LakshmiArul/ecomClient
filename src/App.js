import axios from "axios";
import "./App.css";

function App() {
	
  const book = [
    {
      name: "The Fault In Our Stars",
      author: "John Green",
      img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
      price: 250,
    },
    {
      name: "Black Beauty",
      author: "Anna Sewell",
      img: "https://i.pinimg.com/originals/eb/5c/9a/eb5c9ac57c03b9dfc177ee9b98f0f74a.jpg",
      price: 350, 
    },
    {
      name: "The Man and the Woman",
      author: "L.Salmon",
      img: "https://pictures.abebooks.com/IMPERIALBKS/md/md30663864619.jpg",
      price: 150,
    },
]
	const initPayment = (data) => {
		const options = {
			key: "rzp_test_YWttrQDdfbs4sI",      
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async (book, index) => {
		try {
			const orderUrl = "http://localhost:8080/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
      {book.map((book,index) => (
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button 
        // onClick={handlePayment}
        onClick={() => handlePayment(book, index)}
        className="buy_btn">
					buy now
				</button>
			</div>
      ))}
		</div>
	);
}

export default App;