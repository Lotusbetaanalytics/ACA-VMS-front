import React from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        mirrored={true}
        // height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={1280}
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        style={{
          float: "right",
          marginRight: "20px",
          marginTop: "10px",
          backgroundColor: "green",
          borderRadius: "5%",
          padding: "10px",
          color: "#fff",
        }}
      >
        Take photo
      </button>
    </>
  );
};

export default WebcamComponent;
