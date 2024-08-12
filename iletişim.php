<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "bedirhan231223@gmail.com"; // E-posta adresinizi buraya ekleyin
    $subject = "Yeni Form Gönderimi";
    $body = "Adı Soyadı: $name\nEmail: $email\nMesaj: $message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mesajınız başarıyla gönderildi.";
    } else {
        echo "Mesaj gönderilirken bir hata oluştu.";
    }
} else {
    echo "Geçersiz istek.";
}
?>
