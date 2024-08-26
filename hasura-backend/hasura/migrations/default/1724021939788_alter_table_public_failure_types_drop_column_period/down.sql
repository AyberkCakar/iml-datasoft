alter table "public"."failure_types" alter column "period" set default 1;
alter table "public"."failure_types" alter column "period" drop not null;
alter table "public"."failure_types" add column "period" int4;
