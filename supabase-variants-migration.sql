-- MACBAYPARTS — compatibility note for the current database
--
-- The current site uses public.products_new with exactly these fields:
-- id, title, model, category, description, price, stock, image_url, search_text
--
-- Do NOT run the old migration that altered public.products.
-- The current website does not require color_variants or battery_variants.
-- Colors for display/topcase products can be represented by separate rows in products_new.
-- Battery capacity buttons use the base price from the matching battery row.
--

-- Optional per-color/per-variant stock, price and image.
-- Example: [{"name":"Silver","stock":true,"price":"1200","image_url":"topcases/silver.jpg"}]
alter table public.products_new
  add column if not exists color_variants jsonb not null default '[]'::jsonb;

-- Optional indexes (safe to run once):
create index if not exists products_new_model_idx on public.products_new (model);
create index if not exists products_new_category_idx on public.products_new (category);
create index if not exists products_new_search_text_idx on public.products_new using gin (to_tsvector('simple', coalesce(search_text,'')));
