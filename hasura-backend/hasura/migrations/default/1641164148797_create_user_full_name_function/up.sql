CREATE OR REPLACE FUNCTION public.user_full_name(user_row users)
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  SELECT user_row.first_name || ' ' || user_row.last_name
$function$;
