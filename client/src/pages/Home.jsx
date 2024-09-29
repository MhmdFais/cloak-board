import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; 

function Home(){
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const res = await axios.get('http://localhost:3000/home/')
            setMessages(res.data)
          } catch (error) {
            console.log("Error fetching messages:", error)
          }
        };
        fetchMessages()
    }, [])
    
    const handleLogout = () => {
        axios.post('http://localhost:3000/home/logout')
          .then(() => {
            console.log("Logged out successfully")
          })
          .catch((err) => console.error("Logout failed:", err))
    };
    
    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:3000/home/message', { message })
          setMessages([...messages, res.data])
          setMessage("")
        } catch (error) {
          console.log("Error posting message:", error)
        }
    }

    return (
        <div className="flex flex-col h-screen">
          {/* Logout Button */}
          <div className="flex justify-end p-4">
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </div>
    
          <div className="flex flex-grow p-4">
            {/* Left - Message Form */}
            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Post a Message</h2>
              {user && <p>Logged in as: {user.firstname} {user.lastname}</p>}
              <form onSubmit={handleMessageSubmit}>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your message"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            </div>
    
            {/* Right - Messages List */}
            <div className="w-2/3 p-4">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">
                      {msg.email}
                    </h3>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    )

}

export default Home