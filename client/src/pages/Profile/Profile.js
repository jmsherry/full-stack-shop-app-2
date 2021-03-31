import React from "react";
import Header from "../../components/Header/Header";
import PageFrame from "../../components/page-frame/page-frame";
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";

function Profile() {
  return (
    <div className="App">
      <Header />
      <PageFrame>
        <h1>Profile</h1>
        <ProfileDisplay />
      </PageFrame>
    </div>
  );
}

export default Profile;
