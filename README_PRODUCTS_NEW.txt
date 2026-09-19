MACBAYPARTS — PRODUCTS_NEW

This ZIP is wired to the Supabase table:
  public.products_new

Expected columns:
  id bigint primary key
  title text
  model text
  category text
  description text
  price text
  stock boolean
  image_url text
  search_text text
  color_variants jsonb

The website reads prices, stock, titles, descriptions and images from products_new.
It does not require the old public.products table.
Color-specific stock/price/image can optionally be stored in color_variants JSONB. If it is empty, the site falls back to the product-level stock/price.

For display/topcase listings, each products_new row is rendered as a product card.
For battery pages, the three capacity choices use the price from the matching battery row.

Supabase project configured in the site:
https://ofkirctsgclaqdpdvjis.supabase.co
