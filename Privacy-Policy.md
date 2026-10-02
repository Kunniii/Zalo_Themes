# Chính sách quyền riêng tư - Chủ đề Zalo

*Cập nhật lần cuối: 02 tháng 10, 2026*

Chính sách này giải thích cách tiện ích Chrome **Chủ đề Zalo** xử lý thông tin khi bạn sử dụng tiện ích.

## Tóm tắt

- Tiện ích không thu thập, tải lên, bán hoặc chia sẻ dữ liệu cá nhân.
- Lựa chọn theme được lưu cục bộ trong Chrome trên thiết bị của bạn.
- Mã tiện ích không gửi dữ liệu đến máy chủ của nhà phát triển, không dùng dịch vụ phân tích và không tải mã thực thi từ xa.
- Tiện ích chỉ hoạt động trên `https://chat.zalo.me/` để áp dụng các biến CSS của theme.

## Thông tin được xử lý

Tiện ích lưu các tùy chọn cần thiết để hoạt động bằng `chrome.storage.local`, gồm trạng thái bật/tắt theme, theme đã chọn và các giá trị biến CSS tương ứng. Các tùy chọn này được lưu trên thiết bị của bạn và không được đồng bộ hoặc gửi đến nhà phát triển bởi tiện ích.

Khi áp dụng theme, mã chạy trên trang Zalo tìm các vùng giao diện sáng/tối và đặt các biến CSS tùy chỉnh. Tiện ích tạm giữ các giá trị CSS nội tuyến ban đầu trong bộ nhớ của tab để khôi phục khi bạn tắt theme. Tiện ích không đọc nội dung tin nhắn, danh bạ, thông tin đăng nhập hoặc dữ liệu hồ sơ để thu thập hay gửi đi.

## Quyền của tiện ích

- **Lưu trữ (`storage`):** lưu theme và trạng thái bật/tắt cục bộ.
- **Chạy mã (`scripting`):** gửi hoặc chạy content script trên tab Zalo đang mở để cập nhật theme ngay khi bạn chọn.
- **Truy cập `https://chat.zalo.me/`:** áp dụng biến CSS trên giao diện Zalo. Tiện ích không yêu cầu quyền truy cập các website khác.

Tiện ích có thể lấy mã tab đang hoạt động để gửi lựa chọn theme đến trang hiện tại. Mã tab chỉ được dùng cho thao tác này; tiện ích không lưu lịch sử duyệt web, URL, tiêu đề trang hoặc nội dung trang trên máy chủ.

## Chia sẻ và lưu giữ dữ liệu

Tiện ích không truyền dữ liệu đến nhà phát triển hoặc bên thứ ba, không bán dữ liệu và không dùng dữ liệu cho quảng cáo. Không có dữ liệu phân tích hoặc hồ sơ người dùng được tạo.

Các tùy chọn theme được giữ trong vùng lưu trữ cục bộ của Chrome cho đến khi bạn xóa dữ liệu tiện ích hoặc gỡ tiện ích. Khi tắt theme, các giá trị CSS ban đầu trên trang được khôi phục; lựa chọn theme vẫn được giữ để dùng lần sau.

## Dịch vụ và mã bên thứ ba

Tiện ích không sử dụng cookie để theo dõi, không kết nối dịch vụ phân tích và không tải JavaScript hoặc WebAssembly từ xa. Việc sử dụng Zalo vẫn tuân theo điều khoản và chính sách quyền riêng tư riêng của Zalo.

## Trẻ em

Tiện ích là công cụ tùy chỉnh giao diện, không hướng đến trẻ em và không chủ ý thu thập thông tin của trẻ em.

## Thay đổi chính sách

Nếu cách tiện ích xử lý dữ liệu thay đổi, chính sách này sẽ được cập nhật cùng với bản phát hành mới. Ngày cập nhật gần nhất được ghi ở đầu trang.

## Liên hệ

Gửi câu hỏi hoặc yêu cầu hỗ trợ qua trang Issues của dự án:

[https://github.com/Kunniii/Zalo_Themes/issues](https://github.com/Kunniii/Zalo_Themes/issues)

Vui lòng không đăng mật khẩu, nội dung tin nhắn hoặc thông tin cá nhân nhạy cảm trong issue công khai.
