FROM php:8.2-cli

# Installer les extensions nécessaires
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libssl-dev \
    && docker-php-ext-install pcntl

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Installer l’extension MongoDB
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

WORKDIR /var/www/html
