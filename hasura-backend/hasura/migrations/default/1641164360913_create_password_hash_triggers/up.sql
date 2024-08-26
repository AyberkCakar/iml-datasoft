CREATE OR REPLACE FUNCTION public.password_hash() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.password != OLD.password OR TG_OP = 'INSERT' THEN
        NEW.password = MD5(NEW.password);
    END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER insert_user_password_hash
    BEFORE INSERT
    ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.password_hash();
    
CREATE TRIGGER update_user_password_hash
    BEFORE UPDATE
    ON public.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.password_hash();
