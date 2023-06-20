import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";

function EditProfileForm() {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch("https://skillz-zone-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      });
  }, []);

  const userEmail = users.filter((em) => em?.email == email);
  const userID = userEmail.find((id) => id?._id);
  const id = userID?._id;

  const onSubmit = (data) => {
    const allData = {
      name: data.name,
      email: data.email,
      title: data.title,
      bio: data.bio,
      image: data.photo,
      website: data.website,
      graduation: data.graduation,
      facebook: data.facebook,
      instagram: data.instagram,
      linkedin: data.linkedin,
      pinterest: data.pinterest,
    };

    fetch(`https://skillz-zone-server.vercel.app/updated-profile/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allData),
    });
  };

  return (
    <div className="edit-profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>About</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name")}
            placeholder="e.g. RS Abdur Rahaman Sultany"
            defaultValue={user?.displayName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            {...register("email")}
            placeholder="e.g. RS Abdur Rahaman Sultany"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title")}
            placeholder="e.g. MERN Stack Developer"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            {...register("bio")}
            className="bio"
            placeholder="e.g. Hi, I'm Abdur Rahman Sultany, a full-stack developer with great expertise in the MERN stack, which allows me to build robust and dynamic web applications. With a deep understanding of these cutting-edge technologies, I seamlessly integrate them to deliver innovative solutions that meet and exceed client expectations.
            "
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="graduation">Graduation:</label>
          <input
            type="text"
            id="graduation"
            name="graduation"
            {...register("graduation")}
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" {...register("photo")} />
        </div>
        <h2>Social</h2>
        <div className="form-group">
          <label htmlFor="website">Website Link:</label>
          <input
            type="text"
            id="website"
            name="website"
            {...register("website")}
            placeholder="e.g. https://rs-rahaman.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="facebook">Facebook Link:</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            {...register("facebook")}
            placeholder="https://www.facebook.com/rsabdurrahamansultany/"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn Link:</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            {...register("linkedin")}
            placeholder="https://www.linkedin.com/rsabdurrahamansultany/"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagram">Instagram Link:</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            {...register("instagram")}
            placeholder="https://www.instagram.com/rsabdurrahamansultany/"
          />
        </div>

        <div className="form-group">
          <label htmlFor="twitter">Twitter Link:</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            {...register("twitter")}
            placeholder="https://www.twitter.com/rsabdurrahamansultany/"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pinterest">Pinterest Link:</label>
          <input
            type="text"
            id="pinterest"
            name="pinterest"
            {...register("pinterest")}
            placeholder="https://www.pinterest.com/rsabdurrahamansultany/"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
