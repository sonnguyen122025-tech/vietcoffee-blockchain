// ======================================================
// VIETCOFFEE TRACE - DEMO BLOCKCHAIN TRACEABILITY
// ======================================================

const $ = (id) => document.getElementById(id);

// ------------------------------------------------------
// DỮ LIỆU CÀ PHÊ DEMO
// ------------------------------------------------------

const demoProduct = {
  id: "VN-CF-2026-001",
  name: "Cà phê Arabica Cầu Đất",
  origin: "Cầu Đất, Đà Lạt, Lâm Đồng",
  manufacturer: "HTX Cà phê Cao nguyên Demo",
  createdAt: "18/09/2026 07:30",

  history: [
    {
      status: "Thu hoạch",
      location: "Cầu Đất, Đà Lạt",
      note: "Thu hoạch quả chín chọn lọc",
      time: "18/09/2026 07:30",
      actor: "HTX Cà phê Cầu Đất"
    },
    {
      status: "Sơ chế",
      location: "Cầu Đất, Đà Lạt",
      note: "Sơ chế ướt, phơi kiểm soát",
      time: "19/09/2026 14:10",
      actor: "Cơ sở sơ chế Cầu Đất"
    },
    {
      status: "Kiểm định chất lượng",
      location: "Đà Lạt, Lâm Đồng",
      note: "Mẫu đạt tiêu chuẩn nội bộ của lô demo",
      time: "21/09/2026 09:20",
      actor: "Bộ phận kiểm định chất lượng"
    },
    {
      status: "Rang & đóng gói",
      location: "Đà Lạt, Lâm Đồng",
      note: "Rang vừa, đóng gói 500g",
      time: "22/09/2026 16:00",
      actor: "VietCoffee Roastery"
    },
    {
      status: "Sẵn sàng phân phối",
      location: "Hà Nội",
      note: "Lô demo phục vụ tiểu luận",
      time: "24/09/2026 08:30",
      actor: "VietCoffee Distribution"
    }
  ]
};


// ------------------------------------------------------
// TẠO URL TRUY XUẤT
// ------------------------------------------------------

function traceURL(id) {
  const url = new URL(window.location.href);

  url.search = "";
  url.hash = "";

  url.searchParams.set("id", id);

  return url.toString();
}


// ------------------------------------------------------
// TẠO QR CODE
// Sử dụng QRCode.js
// ------------------------------------------------------

function createQR(id) {

  const box = $("qr");

  if (!box) return;

  box.innerHTML = "";

  const url = traceURL(id);

  try {

    new QRCode(box, {
      text: url,
      width: 220,
      height: 220,
      correctLevel: QRCode.CorrectLevel.H
    });

  } catch (error) {

    console.error("QR Error:", error);

    box.innerHTML =
      '<p class="muted">Không tạo được QR.</p>';
  }
}


// ------------------------------------------------------
// HIỂN THỊ SẢN PHẨM
// ------------------------------------------------------

function render(product) {

  if (!product) return;

  const result = $("result");

  if (!result) return;

  const historyHTML = product.history.map(item => {

    return `
      <div class="event">

        <b>${item.status}</b>

        <p>
${item.location} • ${item.time}
        </p>

        <p>
          ${item.note}
        </p>

        <small>
          Đơn vị xác nhận: ${item.actor}
        </small>

      </div>
    `;

  }).join("");


  result.innerHTML = `

    <div class="product">

      <div>
        <span class="pill">
          ĐÃ XÁC MINH / DEMO
        </span>
      </div>

      <h2 style="margin-top:12px">
        ${product.name}
      </h2>

      <p>
        <b>Mã lô:</b>
        ${product.id}
      </p>

      <p>
        <b>Xuất xứ:</b>
        ${product.origin}
      </p>

      <p>
        <b>Nhà sản xuất:</b>
        ${product.manufacturer}
      </p>

      <p>
        <b>Khởi tạo:</b>
        ${product.createdAt}
      </p>

      <h3>
        Hành trình sản phẩm
      </h3>

      <div class="timeline">

        ${historyHTML}

      </div>

    </div>

  `;


  // tạo QR sau khi hiển thị sản phẩm

  setTimeout(() => {
    createQR(product.id);
  }, 100);
}


// ------------------------------------------------------
// NẠP DỮ LIỆU DEMO
// ------------------------------------------------------

if ($("demo")) {

  $("demo").onclick = () => {

    localStorage.setItem(
      "coffeeDemo",
      JSON.stringify(demoProduct)
    );

    if ($("qid")) {
      $("qid").value = demoProduct.id;
    }

    render(demoProduct);
  };
}


// ------------------------------------------------------
// TRA CỨU
// ------------------------------------------------------

if ($("search")) {

  $("search").onclick = () => {

    const id = $("qid").value.trim();

    const stored =
      JSON.parse(
        localStorage.getItem("coffeeDemo") || "null"
      );

    if (
      stored &&
      stored.id === id
    ) {

      render(stored);

    } else if (
      id === demoProduct.id
    ) {

      render(demoProduct);

    } else {

      $("result").innerHTML =
        "<p>Không tìm thấy mã lô.</p>";

      if ($("qr")) {
        $("qr").innerHTML = "";
      }
    }
  };
}


// ------------------------------------------------------
// TẢI QR PNG
// ------------------------------------------------------

window.downloadQR = function () {

  const qrBox = $("qr");

  if (!qrBox) return;

  const canvas = qrBox.querySelector("canvas");
  const img = qrBox.querySelector("img");

  let src = "";

  if (canvas) {
    src = canvas.toDataURL("image/png");
  } else if (img) {
    src = img.src;
  }

  if (!src) {
    alert("QR chưa được tạo.");
    return;
  }

  const id =
    $("qid")?.value ||
    demoProduct.id;

  const a =
    document.createElement("a");

  a.href = src;

  a.download =
    `VietCoffee-QR-${id}.png`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
};


// ------------------------------------------------------
// KẾT NỐI METAMASK
// ------------------------------------------------------

if ($("connect")) {

  $("connect").onclick = async () => {
try {

      if (!window.ethereum) {

        alert(
          "Chưa phát hiện MetaMask. " +
          "Bạn vẫn có thể sử dụng chế độ Demo."
        );

        return;
      }

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts"
        });

      if ($("account")) {

        const wallet =
          accounts[0];

        $("account").textContent =
          "Đã kết nối: " +
          wallet.substring(0, 6) +
          "..." +
          wallet.substring(
            wallet.length - 4
          );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Không thể kết nối MetaMask."
      );
    }
  };
}


// ------------------------------------------------------
// ĐỌC MÃ LÔ TỪ QR / URL
// ------------------------------------------------------

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const id =
      params.get("id");

    if (id) {

      if ($("qid")) {
        $("qid").value = id;
      }

      const stored =
        JSON.parse(
          localStorage.getItem(
            "coffeeDemo"
          ) || "null"
        );

      if (
        stored &&
        stored.id === id
      ) {

        render(stored);

      } else if (
        id === demoProduct.id
      ) {

        render(demoProduct);
      }
    }
  }
);
