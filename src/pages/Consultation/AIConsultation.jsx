import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Camera,
  Clock,
  Sun,
  Moon,
  Star,
  ExternalLink,
  X,
} from "lucide-react";

const AIConsultation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [uploadMode, setUploadMode] = useState("file"); // 'file' or 'camera'
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      // nếu muốn chắc chắn, gọi play() thêm:
      videoRef.current.play();
    }
  }, [isCameraOpen, stream]);
  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkAuthentication = () => {
      const username =
        sessionStorage.getItem("username") || localStorage.getItem("username");
      const email =
        sessionStorage.getItem("email") || localStorage.getItem("email");

      if (username && email) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };

    checkAuthentication();
  }, []);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 700,
          height: 550,
          facingMode: "user", // Front camera
        },
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.log("Camera access error:", err);

      setError("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          const file = new File([blob], "captured-photo.jpg", {
            type: "image/jpeg",
          });
          setSelectedFile(file);
          setPreview(canvas.toDataURL());
          closeCamera();
          setError(null);
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Vui lòng chọn ảnh trước khi phân tích");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("Image", selectedFile);

      const response = await fetch(
        "https://skincareapp.somee.com/SkinCare/Routine/upload",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Bạn cần đăng nhập để sử dụng tính năng này");
        }
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `${errorData?.message || "Có lỗi xảy ra khi phân tích ảnh"}`
        );
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const ProductCard = ({ product, timeIcon: TimeIcon, timeColor }) => (
    <div
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
      onClick={() => window.open(product.productLink, "_blank")}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageLink}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div
          className={`absolute top-4 left-4 ${timeColor} text-white p-3 rounded-2xl shadow-xl backdrop-blur-sm bg-white bg-opacity-20`}
        >
          <TimeIcon size={18} />
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-xl">
          {formatPrice(product.price)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.categories.map((category) => (
            <span
              key={category.id}
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200"
            >
              {category.name}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
            Xem ngay{" "}
            <ExternalLink
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const TimeSection = ({
    title,
    products,
    icon: Icon,
    color,
    bgGradient,
    iconColor,
  }) => (
    <div
      className={`${bgGradient} rounded-3xl p-8 shadow-xl backdrop-blur-lg border border-white border-opacity-20`}
    >
      <div className="flex items-center mb-8">
        <div
          className={`${iconColor} p-4 rounded-3xl mr-4 shadow-xl backdrop-blur-sm`}
        >
          <Icon size={28} className="text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${color} mb-1`}>{title}</h2>
          <p className="text-gray-600">Quy trình chăm sóc da chuyên nghiệp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            timeIcon={Icon}
            timeColor={iconColor}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-40">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-pink-200 opacity-30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-3xl mr-4 shadow-xl">
              <Star className="text-white" size={40} />
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                AI Skincare Consultation
              </h1>
              <p className="text-blue-100 text-lg">
                Phân tích da thông minh • Tư vấn chăm sóc cá nhân hóa
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="flex items-center text-white text-opacity-90">
              <span className="mr-2 text-yellow-300">⚡</span>
              <span className="text-sm font-medium">Phân tích nhanh</span>
            </div>
            <div className="flex items-center text-white text-opacity-90">
              <span className="mr-2 text-blue-300">🛡️</span>
              <span className="text-sm font-medium">An toàn 100%</span>
            </div>
            <div className="flex items-center text-white text-opacity-90">
              <span className="mr-2 text-yellow-300">🏆</span>
              <span className="text-sm font-medium">Độ chính xác cao</span>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Chụp ảnh khuôn mặt
              </h3>
              <button
                onClick={closeCamera}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-6">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 border-4 border-blue-400 border-dashed rounded-2xl opacity-50"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={capturePhoto}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Camera className="inline mr-2" size={20} />
                Chụp ảnh
              </button>
              <button
                onClick={closeCamera}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="container mx-auto px-6 py-12 relative">
        {checkingAuth ? (
          /* Loading Authentication Check */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white border-opacity-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
                <div className="absolute inset-0 rounded-full bg-blue-100 bg-opacity-50 blur-xl"></div>
              </div>
              <p className="text-gray-600 text-lg">
                Đang kiểm tra trạng thái đăng nhập...
              </p>
            </div>
          </div>
        ) : !isAuthenticated ? (
          /* Not Authenticated */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white border-opacity-20">
              <div className="bg-gradient-to-r from-red-100 to-pink-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-red-600 text-3xl">🔐</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Yêu cầu đăng nhập
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Bạn cần đăng nhập để sử dụng tính năng AI phân tích da chuyên
                nghiệp
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Đăng nhập ngay
              </button>
            </div>
          </div>
        ) : !results ? (
          /* Upload Section */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white border-opacity-20">
              <div className="text-center mb-10">
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Camera className="text-blue-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Tải ảnh khuôn mặt của bạn
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  AI sẽ phân tích làn da của bạn và đưa ra lời khuyên chăm sóc
                  da cá nhân hóa dựa trên tình trạng da hiện tại
                </p>
              </div>

              {/* Upload Mode Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-2xl p-2 flex">
                  <button
                    onClick={() => setUploadMode("file")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      uploadMode === "file"
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Upload className="inline mr-2" size={20} />
                    Tải từ thiết bị
                  </button>
                  <button
                    onClick={() => setUploadMode("camera")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      uploadMode === "camera"
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Camera className="inline mr-2" size={20} />
                    Chụp trực tiếp
                  </button>
                </div>
              </div>

              {/* File Upload Area */}
              {uploadMode === "file" && (
                <div className="mb-8">
                  <label className="block w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div
                      className={`
                      border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-500 relative overflow-hidden
                      ${
                        selectedFile
                          ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50"
                          : "border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50"
                      }
                    `}
                    >
                      {preview ? (
                        <div className="space-y-6">
                          <div className="relative inline-block">
                            <img
                              src={preview}
                              alt="Preview"
                              className="max-w-80 max-h-80 mx-auto rounded-2xl shadow-2xl object-cover border-4 border-white"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black from-opacity-10 to-transparent"></div>
                          </div>
                          <p className="text-blue-600 font-semibold text-lg">
                            ✓ Ảnh đã được chọn: {selectedFile?.name}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="relative">
                            <Upload
                              className="mx-auto text-gray-400"
                              size={64}
                            />
                            <div className="absolute inset-0 bg-blue-100 bg-opacity-30 rounded-full blur-2xl"></div>
                          </div>
                          <div>
                            <p className="text-xl font-semibold text-gray-700 mb-2">
                              Chọn ảnh hoặc kéo thả vào đây
                            </p>
                            <p className="text-gray-500">
                              Hỗ trợ JPG, PNG (tối đa 10MB) • Chất lượng cao cho
                              kết quả tốt nhất
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Camera Capture Area */}
              {uploadMode === "camera" && (
                <div className="mb-8">
                  <div className="border-3 border-dashed border-gray-300 rounded-3xl p-12 text-center">
                    {preview ? (
                      <div className="space-y-6">
                        <div className="relative inline-block">
                          <img
                            src={preview}
                            alt="Captured"
                            className="max-w-80 max-h-80 mx-auto rounded-2xl shadow-2xl object-cover border-4 border-white"
                          />
                        </div>
                        <p className="text-blue-600 font-semibold text-lg">
                          ✓ Ảnh đã được chụp thành công
                        </p>
                        <button
                          onClick={() => {
                            setPreview(null);
                            setSelectedFile(null);
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-xl transition-all duration-300"
                        >
                          <span className="inline mr-2">🔄</span>
                          Chụp lại
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative">
                          <Camera className="mx-auto text-gray-400" size={64} />
                          <div className="absolute inset-0 bg-blue-100 bg-opacity-30 rounded-full blur-2xl"></div>
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-gray-700 mb-2">
                            Chụp ảnh khuôn mặt trực tiếp
                          </p>
                          <p className="text-gray-500 mb-6">
                            Nhấn nút bên dưới để mở camera và chụp ảnh
                          </p>
                          <button
                            onClick={openCamera}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                          >
                            <Camera className="inline mr-2" size={20} />
                            Mở camera
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                  <p className="text-red-600 text-center font-medium text-lg">
                    {error}
                  </p>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={loading || !selectedFile}
                className={`
                  w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden
                  ${
                    loading || !selectedFile
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-7 w-7 border-3 border-white border-t-transparent mr-4"></div>
                    Đang phân tích với AI...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Star className="mr-3" size={24} />
                    Bắt đầu phân tích với AI
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-12">
            {/* Advice Section */}
            <div className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-3xl p-10 shadow-2xl border border-white border-opacity-20 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-3xl mr-6 shadow-xl">
                  <Star className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-green-700 mb-1">
                    Lời khuyên chuyên gia
                  </h2>
                  <p className="text-green-600">
                    Được phân tích bởi AI chuyên nghiệp
                  </p>
                </div>
              </div>
              <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-30">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {results.advice}
                </p>
              </div>
            </div>

            {/* Morning Routine */}
            {results.morning && results.morning.length > 0 && (
              <TimeSection
                title="Buổi sáng"
                products={results.morning}
                icon={Sun}
                color="text-amber-700"
                bgGradient="bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100"
                iconColor="bg-gradient-to-r from-amber-500 to-orange-500"
              />
            )}

            {/* Noon Routine */}
            {results.noon && results.noon.length > 0 && (
              <TimeSection
                title="Buổi trưa"
                products={results.noon}
                icon={Clock}
                color="text-orange-700"
                bgGradient="bg-gradient-to-br from-orange-100 via-red-100 to-pink-100"
                iconColor="bg-gradient-to-r from-orange-500 to-red-500"
              />
            )}

            {/* Evening Routine */}
            {results.evening && results.evening.length > 0 && (
              <TimeSection
                title="Buổi chiều"
                products={results.evening}
                icon={Sun}
                color="text-pink-700"
                bgGradient="bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100"
                iconColor="bg-gradient-to-r from-pink-500 to-purple-500"
              />
            )}

            {/* Night Routine */}
            {results.night && results.night.length > 0 && (
              <TimeSection
                title="Buổi tối"
                products={results.night}
                icon={Moon}
                color="text-indigo-700"
                bgGradient="bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100"
                iconColor="bg-gradient-to-r from-indigo-500 to-purple-600"
              />
            )}

            {/* New Analysis Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResults(null);
                  setSelectedFile(null);
                  setPreview(null);
                  setError(null);
                  setUploadMode("file");
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                <Camera className="inline mr-3" size={24} />
                Phân tích ảnh mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultation;
