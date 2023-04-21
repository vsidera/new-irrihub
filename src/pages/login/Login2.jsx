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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <div className="mt-1 relative rounded-md">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.585 12l4.95 4.95-1.414 1.414L10.172 13H2v-2h8.172l4.95-4.95L16.536 4.636 11.585 9.586 11.585 12zm-9-5a1 1 0 012 0v1h1a1 1 0 110 2H5v1a1 1 0 11-2 0V8zm14 5a1 1 0 01-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 112 0v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-sm">
            <div className="mt-1 relative rounded-md">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </div>
   
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
    </div>
    </div>
  );
}

export default Login2;
