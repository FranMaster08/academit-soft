import React, { useState, useRef } from "react";
import {
  Upload,
  Button,
  Space,
  message,
  Form,
  Input,
  Select,
  Steps,
} from "antd";
import { UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "./videoUploader.css";
const { Step } = Steps;
const { Option } = Select;

const VideoUploader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [videoDescription, setVideoDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [supportMaterials, setSupportMaterials] = useState([]);

  const videoRef = useRef(null);

  const handleFileChange = ({ fileList }) => {
    const pdfFiles = fileList.filter((file) => file.type === "application/pdf");
    setSupportMaterials(pdfFiles);
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const videoUrl = file.url || file.preview;
    const videoWindow = window.open("", "_blank");
    videoWindow.document.write(`
      <video controls width="400">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
    `);
  };

  const handleUpload = () => {
    // Validar y enviar los datos al servidor

    message.success("Datos enviados correctamente");
    setFileList([]);
    setVideoDescription("");
    setSelectedCourse("");
    setSupportMaterials([]);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    const newFileList = [...fileList, ...videoFiles];
    setFileList(newFileList);
    setSupportMaterials(pdfFiles);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div className="video-preview-container">
              <div className="video-preview">
                {fileList.length > 0 && (
                  <video
                    ref={videoRef}
                    src={URL.createObjectURL(fileList[0].originFileObj)}
                    width="400"
                    controls
                  />
                )}
                {fileList.length === 0 && (
                  <div className="upload-placeholder">
                    <PlayCircleOutlined style={{ fontSize: 48 }} />
                    <p>Haz clic o arrastra un video aquí</p>
                  </div>
                )}
              </div>
              <Upload.Dragger
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleFileChange}
                onPreview={handlePreview}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz clic o arrastra los videos aquí para subirlos
                </p>
              </Upload.Dragger>
            </div>
          </div>
        );
      case 1:
        return (
          <Form layout="vertical">
            <Form.Item label="Descripción del video">
              <Input.TextArea
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Curso al cual pertenece">
              <Select
                value={selectedCourse}
                onChange={(value) => setSelectedCourse(value)}
              >
                <Option value="curso1">Curso 1</Option>
                <Option value="curso2">Curso 2</Option>
                <Option value="curso3">Curso 3</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Material de apoyo">
              <Upload.Dragger
                fileList={supportMaterials}
                beforeUpload={(file) => {
                  const isPDF = file.type === "application/pdf";
                  if (!isPDF) {
                    message.error("Solo se permiten archivos PDF");
                  }
                  return isPDF;
                }}
                onChange={handleFileChange}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz clic o arrastra los archivos PDF aquí para subirlos
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        );
      case 2:
        return (
          <div>
            <h3>Descripción del video:</h3>
            <p>{videoDescription}</p>
            <h3>Curso al cual pertenece:</h3>
            <p>{selectedCourse}</p>
            <h3>Material de apoyo:</h3>
            <ul>
              {supportMaterials.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <h3>Video:</h3>
            <video
              src={URL.createObjectURL(fileList[0].originFileObj)}
              width="400"
              controls
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="video-uploader-container">
      <Steps current={currentStep}>
        <Step title="Cargar video" />
        <Step title="Completar formulario" />
        <Step title="Visualización" />
      </Steps>
      <div className="video-uploader-content">{renderStepContent()}</div>
      <div className="button-container">
        {currentStep > 0 && <Button onClick={handlePrevStep}>Anterior</Button>}
        {currentStep < 2 && (
          <Button type="primary" onClick={handleNextStep}>
            Siguiente
          </Button>
        )}
        {currentStep === 2 && (
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
          >
            Enviar
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
