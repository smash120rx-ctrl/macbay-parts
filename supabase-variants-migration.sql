-- MACBAYPARTS: optional product variants / stock fields
-- Run once in Supabase SQL Editor.
alter table public.products
    add column if not exists stock boolean default true,
    add column if not exists image_url text,
    add column if not exists color_variants jsonb default '[]'::jsonb,
    add column if not exists battery_variants jsonb default '[]'::jsonb;

-- Example battery_variants value:
-- [
--   {"name":"85–90%","price":1200},
--   {"name":"90–95%","price":1500},
--   {"name":"95–100%","price":1800}
-- ]

-- Example color_variants value:
-- [
--   {"name":"Silver","image_url":"models/.../silver.jpg","model":"A1932","stock":true},
--   {"name":"Space Gray","image_url":"models/.../space-gray.jpg","model":"A1932","stock":true},
--   {"name":"Gold","image_url":"models/.../gold.jpg","model":"A1932","stock":false},
--   {"name":"Midnight","image_url":"models/.../midnight.jpg","model":"A1932","stock":true}
-- ]
