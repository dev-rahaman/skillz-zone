import React from "react";
import { useForm } from "react-hook-form";

function EditProfileForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Perform form submission logic here
  };

  return (
    <div className="edit-profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name")}
            placeholder="e.g. RS Abdur Rahaman Sultany"
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
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" {...register("photo")} />
        </div>

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
