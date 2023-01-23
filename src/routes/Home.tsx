import { UserProps } from "../types/user";

import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";

import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  const loadUser = async (userName: string) => {
    setError(false);
    setUser(null);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    console.log(data);

    if (res.status === 404) {
      setError(true);
      return;
    }

    const {
      name,
      avatar_url,
      login,
      location,
      followers,
      following,
      html_url,
    } = data;
    const userData: UserProps = {
      name,
      avatar_url,
      login,
      location,
      followers,
      following,
      html_url,
    };
    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
