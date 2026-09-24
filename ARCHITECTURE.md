# Sơ đồ kiến trúc

```text
Nhà sản xuất / HTX / Đơn vị logistics
              | ký giao dịch bằng ví
              v
       Web App (HTML/CSS/JS)
              | ethers.js + ABI
              v
 Smart Contract ProductTraceability
              | giao dịch / event / state
              v
       Ethereum Sepolia
              | đọc dữ liệu
              v
  QR Code -> Người tiêu dùng tra cứu
```

## Dữ liệu demo
Lô `VN-CF-2026-001` là dữ liệu **giả lập phục vụ demo**, không phải hồ sơ truy xuất của một HTX/doanh nghiệp có thật.
