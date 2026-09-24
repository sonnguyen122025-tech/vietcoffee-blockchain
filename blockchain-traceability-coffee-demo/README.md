# VietCoffee Trace — Blockchain Traceability Demo

Prototype tiểu luận: truy xuất nguồn gốc cà phê Việt Nam bằng Solidity + Ethereum Sepolia + ethers.js + QR Code.

## Chạy ngay chế độ demo offline
1. Giải nén thư mục.
2. Mở terminal tại `frontend`.
3. Chạy `python -m http.server 8080`.
4. Mở `http://localhost:8080`.
5. Nhấn **Nạp dữ liệu cà phê mẫu**. Hệ thống hiển thị timeline và sinh QR PNG thật.

> Dữ liệu cà phê/HTX trong demo là dữ liệu giả lập cho mục đích học tập.

## Chạy với Blockchain Sepolia
1. Mở Remix, deploy `contracts/ProductTraceability.sol` bằng ví trên Sepolia.
2. Copy contract address.
3. Mở `frontend/app.js`, thay `PASTE_CONTRACT_ADDRESS_HERE`.
4. Chạy web server như trên.
5. Kết nối MetaMask, tạo lô, thêm sự kiện, tra cứu.
6. QR chứa URL có tham số `?id=...`; khi website được host trên một URL mà điện thoại truy cập được, quét QR sẽ mở đúng lô.

## Demo khi bảo vệ
- Bước A: Nạp dữ liệu mẫu để cho thấy UI/timeline/QR ngay cả khi mạng chậm.
- Bước B: Kết nối MetaMask và tạo lô mới trên Sepolia.
- Bước C: Thêm một sự kiện, xác nhận giao dịch.
- Bước D: Tra cứu lô và mở transaction/contract trên Sepolia Etherscan.
- Bước E: Quét QR bằng điện thoại. Nếu chạy localhost, hãy host frontend trên GitHub Pages/Netlify/Vercel hoặc cùng mạng LAN với URL mà điện thoại truy cập được.

## Lưu ý bảo mật
Không bao giờ đưa seed phrase/private key vào source code. Chỉ dùng test ETH cho demo.
