# Project test intern back-end

- ## `npm i` để cài các dependencies

- ## Vào xampp tạo một database có name là test-intern2

    (Trường hợp này em dùng mySQL trên xampp thì username sẽ là root và password là null) nếu muốn luôn dùng password thì vào file .env thay đổi lại DATABASE_URL
    DATABASE_URL = DATABASE_URL="mysql://username:password@localhost:3306/test-intern2"

- ## Sau khi làm bước trên thì dùng lệnh `npx prisma migrate dev --name init` để tạo bản trong MySQL

- ## `npm run dev` để chạy được dự án
