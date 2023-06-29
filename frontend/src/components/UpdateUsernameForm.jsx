import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(Object.fromEntries(formData.entries()));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    if (error?.status > 400 && error?.status < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <form id="username-update" onSubmit={handleSubmit}>
    <label id="username-update-label" htmlFor='username'>New Username</label>
    <input type='text' id='username' name='username'/>
    <input type="hidden" name="id" value={currentUser.id} />

    <button id="username-update-submit" className="ui button">Update Username</button>
  </form>;
}
