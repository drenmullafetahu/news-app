FROM php:8.1


RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app/backend
RUN composer install
COPY . .

EXPOSE 8000
RUN composer update --no-scripts
CMD php artisan serve --host=0.0.0.0
