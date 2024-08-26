CREATE TABLE "public"."simulators" ("id" serial NOT NULL, "simulator_name" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("simulator_name"), UNIQUE ("id"));
