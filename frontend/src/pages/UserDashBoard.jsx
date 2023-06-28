import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import ProductContext from "../contexts/ProductContext";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import GroceryCard from "../components/GroceryCard";
import CreateGroceryForm from "../components/CreateGroceryForm";
import { fetchHandler } from "../utils";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  const [lists, setList] = useState([]);
  const {
    removeButton,
    setRemoveButton,
    addButton,
    setAddButton,
  } = useContext(ProductContext);

  const loadUser = async () => {
    const [user, error] = await getUser(id);
    if (error) return setErrorText(error.statusText);
    setUserProfile(user);
  };

  const doFetch = async () => {
    try {
      const res = await fetchHandler(`/api/grocerylist/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res[0]);
      setList(res[0]);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    if (removeButton) {
      setRemoveButton(false);
      console.log("render");
    }
    if (addButton) {
      setAddButton(false);
    }
    // if (recommendation) {
    //   setRecommendation(false);
    // }
    const loadInfoUser = async () => {
      try {
        await loadUser();
        await doFetch();
      } catch (err) {
        console.log(err);
        return null;
      }
    };
    loadInfoUser();
  }, [id, removeButton, addButton]);
  // id

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  console.log(lists);

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <>
      <div className="page-bg">
        <div id="userDash-head">
          <CreateGroceryForm />
          <div id="userDash-head-user">
            <h1 id="userDash-user">{profileUsername}'s Dashboard</h1>
            <p>If the user had any data, here it would be</p>
            <p>Fake Bio or something</p>
            {!!isCurrentUserProfile && (
              <button id="userDash-logout-button" className=" ui button"onClick={handleLogout}>Log Out</button>
            )}
            {!!isCurrentUserProfile && (
              <UpdateUsernameForm // Remind me to change the default Username 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </div>
        </div>

        <div id="grocery-card" className="ui centered cards">
          {lists.map((list) => {
            return (
              <GroceryCard
                key={list.id}
                grocery={list}
                onClick={() => navigate(`/grocerylist/${list.id}`)}
              />
              //add onClick and add a fetch to get the groceryid and fetch it
            );
          })}
        </div>
      </div>
    </>
  );
}
