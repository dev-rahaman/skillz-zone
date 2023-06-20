const Headings = ({ title, heading, brows }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "50px  50px 30px 50px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "20px",
              color: "var(--secondary)",
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              fontSize: "30px",
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            {heading}
          </h2>
        </div>
        <div>
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "#fff",
              padding: "5px",
              borderRadius: "5px",
              backgroundColor: "var(--primary)",
              textTransform: "uppercase",
            }}
          >
            {brows}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Headings;
