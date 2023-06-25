<h1 align="center">
  <a href="https://github.com/Maru-Yasa/SEVIMA-Vidya-Learn">
    <!-- Please provide path to your logo here -->
    <img src="banner.png" alt="Logo">
  </a>
</h1>

Vidya berasal dari bahasa sangsekerta yang artinya cerdas. Kamu bisa belajar dengan lebih cepat dan cerdas bersama Vidya. Vidya dapat membantu Siswa maupun Guru untuk belajar hal yang mereka inginkan, khusus untuk guru, guru dapat menganalisa siswanya seperti, trend pertanyaan, serta analytic penggunaan applikasi

## Fitur

 - Mampu merangkum dan memberi referensi belajar via internet
 - UI yang mudah dipahami
 - Analisis penggunaan prompt
 - Login sebagai Guru / Siswa

## Tech Stack

 - MongoDB with prisma
 - NodeJs with Express
 - OpenAi
 - React powered by vite
 - TailwindCSS
 
## Instalasi

    $ git clone https://github.com/Maru-Yasa/SEVIMA-Vidya-Learn
    $ cd back-end && npm i && cd ../front-end && npm i && cd ../
    $ cd back-end && cp .env.example && npx prisma generate
    
   ### Menjalankan Back-end

    $ npm run start 
   or
  
    $ npm run dev

   server by default berjalan di port 3000
 
   ### Menjalankan Front-end

    $ npm run dev
   
  ### Back-End Env Variable
  

    DATABASE_URL  =
	PORT  =  3000
	OPEN_AI_SECRET  =  api_key_here
	OPEN_AI_ORGANIZATION  =  org_here
	SECRET  =  secret
