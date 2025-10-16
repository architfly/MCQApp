import React, { useState } from "react";

function CrmKurulMulakati() {
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
    file: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Request submitted successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded shadow mb-6">
        CRM & Kurul Mülakatı
      </button>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Box - Details */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
            Details
          </h2>

          <p className="mb-4 text-gray-700">
            CRM, Kurul ve Grup Mülakatları ile alakalı bilgi almak için{" "}
            <a
              href="https://www.havacilikpsikolojisi.net"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              HavacilikPsikolojisi.net
            </a>{" "}
            'in aşağıdaki kaynaklarını inceleyebilirsiniz.
          </p>

          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              - Ücretsiz Kaynaklar Linki:{" "}
              <a
                href="https://forms.gle/Dz8r2Hf7fGNh232f8"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://forms.gle/Dz8r2Hf7fGNh232f8
              </a>
            </li>
            <li>
              - Gerçek Mülakat Deneyimi Randevu Planlama:{" "}
              <a
                href="https://forms.gle/Dz8r2Hf7fGNh232f8"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://forms.gle/Dz8r2Hf7fGNh232f8
              </a>
            </li>
            <li>
              - Teorik Eğitim Ön Kayıt Linki:{" "}
              <a
                href="https://forms.gle/hSUcyywgMvWL22rHA"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://forms.gle/hSUcyywgMvWL22rHA
              </a>
            </li>
          </ul>

          <h3 className="mt-6 font-semibold text-gray-800">
            Mülakatlardan Önce İncelenmesi Gereken Linkler:
          </h3>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 text-sm">
            <li>
              Takeoff Channel 2019:{" "}
              <a
                href="https://www.youtube.com/watch?v=E-P_t9TGCTI"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.youtube.com/watch?v=E-P_t9TGCTI
              </a>
            </li>
            <li>
              Takeoff Channel 2022:{" "}
              <a
                href="https://www.youtube.com/watch?v=8ghNnFHSL_M"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.youtube.com/watch?v=8ghNnFHSL_M
              </a>
            </li>
            <li>
              Soru & Cevap Etkinliği:{" "}
              <a
                href="https://www.youtube.com/watch?v=jZBmNUk328Y"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.youtube.com/watch?v=jZBmNUk328Y
              </a>
            </li>
            <li>
              Soru & Cevap Etkinliği:{" "}
              <a
                href="https://www.youtube.com/watch?v=XI9IWeTR8Us"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.youtube.com/watch?v=XI9IWeTR8Us
              </a>
            </li>
            <li>
              3 Temel Kriter:{" "}
              <a
                href="https://blog.havacilikpsikolojisi.net/crm-mulakati-temelde-ne-olcer-3-temel-kriter/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Blog Link
              </a>
            </li>
            <li>
              Mülakatlara Hazırlanırken Yapılan 13 Hata:{" "}
              <a
                href="https://blog.havacilikpsikolojisi.net/crm-mulakatina-hazirlanirken-en-sik-yapilan-13-hata/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Blog Link
              </a>
            </li>
            <li>
              Yetkinlik Bazlı Mülakata Örnek Düşünmek:{" "}
              <a
                href="https://blog.havacilikpsikolojisi.net/crm-mulakatina-ornek/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Blog Link
              </a>
            </li>
            <li>
              Danışmanlık Hizmetinin Kısa Anlatımı:{" "}
              <a
                href="https://www.youtube.com/watch?v=6gcJLfXQbqU"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                YouTube
              </a>
            </li>
            <li>
              Gerçek Mülakat Deneyimleme Hizmetinin Kısa Anlatımı:{" "}
              <a
                href="https://youtu.be/LLtd4K5WnT4"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        {/* Right Box - Request Form */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
            Request Form
          </h2>

          <p className="text-sm text-gray-700 mb-3">
            <a
              href="https://www.havacilikpsikolojisi.net/crm-on-kayit-formu/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              https://www.havacilikpsikolojisi.net/crm-on-kayit-formu/
            </a>
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <a
              href="mailto:info@havacilikpsikolojisi.net"
              className="text-blue-600 hover:underline"
            >
              info@havacilikpsikolojisi.net
            </a>
            <br />
            +90 544 853 15 34 <br />
            +90 545 853 15 35
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Yukarıdaki link ve telefon numaralarından{" "}
            <span className="text-blue-600 font-semibold">
              HavacilikPsikolojisi.net
            </span>{" "}
            ile iletişime geçebilirsiniz. Size en kısa zamanda dönüş
            yapılacaktır.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="+91..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Type your message..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                File Upload
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              SEND REQUEST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrmKurulMulakati;
