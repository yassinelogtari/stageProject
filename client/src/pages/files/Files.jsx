import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatableFiles/Datatable";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import "./files.scss";

export default function Files() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);
    formData.append("month", month);
    formData.append("year", year);
    axios
      .post("/api/upload", formData)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      await axios.post("/api/pdfsplit", formData);
      setSuccessMessage("Emails sent successfully.");

      setLoading(false);
    } catch (error) {
      setError("Error splitting PDF. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <form className="formfile" onSubmit={handleUpload}>
            <div className="mounthyear">
              <div className="formInput">
                <label htmlFor="month">Month</label>
                <input
                  type="text"
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  style={{ backgroundColor: "#F8F8F8" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ backgroundColor: "#F8F8F8" }}
                />
              </div>
              <div className="uploadform">
                <label htmlFor="file" className="fileuploadlabel">
                  File:
                  <UploadFileIcon className="iconFile" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  className="fileupload"
                />
                <button type="submit">Upload</button>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="formfile">
            <div className="uploadformEmails">
              <label htmlFor="file" className="fileuploadlabel">
                File:
                <UploadFileIcon className="iconFile" />
              </label>
              <input
                type="file"
                name="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              <button type="submit" disabled={loading}>
                Send Emails
              </button>
            </div>
          </form>
          <div className="EmailMessage">
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
          </div>

          <Datatable />
        </div>
      </div>
    </div>
  );
}
