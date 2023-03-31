import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { userApps } from "../../actions/applications/appsActions";
import AppsCard from "../../components/appsCard/appsCard";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const getApps = () => {
    userApps()
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setApps(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApps();
  }, []);

  const client ={ "name": "Client",
  "email": "john.doe@example.com",
  "id": 3,

}

  const appss = [
    {
      "name": "Admin",
      "email": "john.doe@example.com",
      "id": 3,
    
    },
    {
      "name": "Customer",
      "email": "jane.smith@example.com",
      "id": 2,

    },

  ]

  return (
    <>
   
    {isLoaded ? <div className="flex justify-center h-screen bg-gray-100 shadow-2xl shadow-top rounded-lg mb-4 m-16">
  <div
    className="flex flex-col justify-center items-center mt-6 mx-auto"
    style={{ width: "60vw" }}
  >
     <h4 className="text-lg text-primary flex justify-center mb-6 font-serif">
        Select your Profile
      </h4>
      <Link
        to={`/client`}

        className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center"
      >
      <AppsCard {...client}/>
      </Link>
    {appss.map((app, index) => (
      <Link
        to={`/admin`}
        key={index}
        className="bg-white rounded-lg shadow-md p-4 m-2 w-2/4 h-24 flex flex-col justify-center items-center"
      >
        <AppsCard key={index} {...app} />
      </Link>
    ))}
  </div>
</div> :
<div>
  <h1>LOADING...</h1>
</div> }
     
      


    </>
  );
};

export default Applications;
