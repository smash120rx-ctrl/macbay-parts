MACBAYPARTS — products_new

Ця версія сайту підключена до Supabase table: products_new.

Поля таблиці:
id | title | model | category | description | price | stock | image_url | search_text

Що змінено:
- каталог Display/Topcase читає products_new;
- ціни читаються з products_new;
- головний пошук підтягує товари з products_new;
- models/admin.html — редагування назви, моделі, категорії, опису, ціни, наявності та URL фото;
- стара таблиця products не використовується для каталогу.

Адмінка:
models/admin.html

ВАЖЛИВО:
Стару таблицю products не видаляйте, доки нову версію не перевірено.
Для зміни фото в адмінці вставляйте публічний URL у поле «Фото — URL». Локальний файл можна спочатку завантажити у Supabase Storage і вставити його public URL.
