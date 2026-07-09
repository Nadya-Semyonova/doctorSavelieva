<?php

class EnvLoader
{
    public static function load(string $path): void
    {
        if (!file_exists($path)) {
            throw new Exception(".env file not found at {$path}");
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
        foreach ($lines as $line) {
            // Пропускаем комментарии
            if (strpos(trim($line), '#') === 0) {
                continue;
            }

            // Разбираем KEY=VALUE
            if (strpos($line, '=') !== false) {
                [$key, $value] = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                
                // Убираем кавычки
                $value = self::removeQuotes($value);
                
                // Загружаем в $_ENV и putenv
                $_ENV[$key] = $value;
                putenv("{$key}={$value}");
            }
        }
    }

    private static function removeQuotes(string $value): string
    {
        if ((substr($value, 0, 1) === '"' && substr($value, -1) === '"') ||
            (substr($value, 0, 1) === "'" && substr($value, -1) === "'")) {
            return substr($value, 1, -1);
        }
        return $value;
    }

    public static function get(string $key, string $default = ''): string
    {
        return $_ENV[$key] ?? $default;
    }
}