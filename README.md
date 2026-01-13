# 🛡️ Better Auth - Next.js 16 

Bu proje, **Next.js 16** ve **Better Auth** framework'ü kullanılarak inşa edilmiş, tip güvenliği (type-safety) ve kullanıcı deneyimi odaklı modern bir kimlik doğrulama şablonudur. Proje; gelişmiş veritabanı hook'ları, sosyal giriş yöntemleri ve genişletilmiş kullanıcı modelleri üzerine kapsamlı bir öğrenme çalışmasıdır.



## 🚀 Öne Çıkan Özellikler

* **Next.js 16 Ready:** En güncel Next.js sürümü (Edge/Experimental) ile tam uyumlu mimari.
* **Social Auth (OAuth 2.0):** * **Google:** Hızlı ve güvenli Google hesabı ile giriş entegrasyonu.
    * **GitHub:** Geliştiriciler için GitHub hesabı ile tek tıkla oturum açma.
* **Gelişmiş Kullanıcı Modeli:** `additionalFields` kullanılarak `gender`, `country`, `lastName` ve `role` gibi ek alanların sisteme entegrasyonu.
* **Database Hooks:** Kullanıcı oluşturulmadan önce çalışan (`create:before`) isim normalleştirme ve otomatik admin/user rol atama mantığı.
* **Email & Verification:** Nodemailer entegrasyonu ile güvenli e-posta doğrulama ve şifre sıfırlama süreçleri.
* **Modern UI/UX:** Shadcn UI, Tailwind CSS ve GSAP kullanılarak hazırlanan, estetik ve animasyonlu kullanıcı arayüzü.

## 🛠️ Teknoloji Yığını

| Teknoloji | Açıklama |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) |
| **Database** | Neon DB (Serverless PostgreSQL) |
| **ORM** | Prisma |
| **Email Service** | Nodemailer |
| **Animations** | GSAP |

## ⚙️ Kurulum ve Yapılandırma

1.  **Repoyu Klonlayın:**
    ```bash
    git clone [https://github.com/kullaniciadi/proje-adi.git](https://github.com/kullaniciadi/proje-adi.git)
    cd proje-adi
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Çevresel Değişkenleri Ayarlayın:**
    `.env` dosyası oluşturun ve aşağıdaki şablonu kendi değerlerinizle doldurun:

    ```env
    # Better Auth Configuration
    BETTER_AUTH_SECRET="your_secret_here"
    BETTER_AUTH_URL="http://localhost:3000"

    # API Configuration
    NEXT_PUBLIC_API_URL="http://localhost:3000"

    # Database (Neon DB / PostgreSQL)
    DATABASE_URL="your_postgresql_connection_string"

    # App Settings
    ADMIN_EMAILS="admin@example.com"
    NODE_ENV="development"

    # Social Providers (OAuth)
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"

    GITHUB_CLIENT_ID="your_github_client_id"
    GITHUB_CLIENT_SECRET="your_github_client_secret"

    # Email Service (Nodemailer)
    NODEMAILER_USER="your_email@gmail.com"
    NODEMAILER_APP_PASSWORD="your_app_specific_password"
    ```

4.  **Veritabanını Hazırlayın:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    ```

## 📝 Proje Amacı

Bu çalışma, **Better Auth** framework'ünün sunduğu esnek yapıyı (additional fields, database hooks, plugins) **Next.js 16** ortamında test etmek amacıyla geliştirilmiştir. Özellikle veritabanı seviyesindeki hook'ların veri bütünlüğünü nasıl sağladığı ve modern OAuth akışlarının nasıl optimize edildiği incelenmiştir.
