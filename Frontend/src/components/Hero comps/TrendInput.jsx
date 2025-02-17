import React, { useState } from "react";
import { Dialog, Snackbar } from "@mui/material";
import axios from "axios";

function TrendInput(props) {
  const [isdailog, setisdailog] = useState(false);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function showDailog() {
    setisdailog(!isdailog);
  }

  const handleSubmit = async () => {
    // Select endpoint based on the category
    let endpoint = "";
    if (props.catgry === "news") {
      endpoint = "https://safecyber-api.onrender.com/api/tfake-create";
    } else if (props.catgry === "scams") {
      endpoint = "https://safecyber-api.onrender.com/api/tscam-create";
    }

    try {
      let response = await axios.post(endpoint, {
        headline: text,
        tcontent: content
      });
      if (response.data.success) {
        setSuccessMessage("Saved successfully!");
        setisdailog(false); // Close the dialog
        props.refreshData();
      } else {
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dialogStyle = {
    marginTop: "12%",
    height: "45%",
    width: "40%",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: "white",
    textAlign: "center",
  };

  return (
    <>
      <button className="raise" onClick={showDailog}>
        Raise a {props.catgry}
      </button>
      {isdailog && (
        <div className="trend-inp-main">
          <Dialog
            open={true}
            BackdropProps={{ style: { backgroundColor: "unset" } }}
            maxWidth={"md"}
            PaperProps={{ sx: dialogStyle }}
          >
            <textarea
              className="trend-inp-input"
              placeholder="Enter the Heading"
              value={text}
              onChange={(e) => setText(e.target.value)} // Update text state
            ></textarea>

            <textarea
              className="trend-inp-cont"
              placeholder="Enter the Content"
              value={content}
              onChange={(e) => setContent(e.target.value)} // Update text state
            ></textarea>

            <button className="trend-scam-btn" onClick={handleSubmit}>
              Submit
            </button>
          </Dialog>
        </div>
      )}

      <Snackbar
        open={successMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </>
  );
}

export default TrendInput;
