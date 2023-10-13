import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import ProfileList from "./ProfileList";

const Profile = () => {
  return (
    <>
      <Header />
      <main className="bg-secondary main__wrapper h-[calc(100vh-48px)]">
        <div className="grid grid-cols-[180px_1fr] gap-10 h-full ">
          <Navigation menu="clients" />
          <div className="pr-10 pt-5 relative">
            <div className="flex justify-between items-end mb-10">
              <h1 className="leading-none mb-0">Profile</h1>
            </div>
            <ProfileList />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
