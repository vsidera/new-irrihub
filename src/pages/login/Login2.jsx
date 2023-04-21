import { useState } from "react";
import { loginAction } from "../../actions/login/loginAction";
import { useNavigate } from "react-router-dom";

function Login2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formValues = {
      mobile_no: username,
      pin: password,
    };
    loginAction(formValues)
      .then((res) => {
        if (res.errors) {
        //   setEventType("fail");
        //   setEventMessage("Login Failed");
        //   setEventTitle("LOGIN");
        //   setIsSnackBarAlertOpen(true);
        } else {
        //   setEventType("success");
        //   setEventMessage("Logged In Successfully!");
        //   setEventTitle("LOGIN");
        //   setIsSnackBarAlertOpen(true);
          setTimeout(() => {
            const priviledge = localStorage.getItem("type");
            if (priviledge === '"ADMIN"') {
              console.log("THEY ARE EQUAL!!!!!!");
              navigate("/devices");
            } else {
              navigate("/my-devices");
            }
            // props.history.push('/sidebar');
          }, 1000);
        }
      })
      .catch((err) => { });
  };

  return (
    <form className="mx-auto max-w-md p-6 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <label htmlFor="rememberMe" className="text-gray-700 font-bold">
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
}

export default Login2;
