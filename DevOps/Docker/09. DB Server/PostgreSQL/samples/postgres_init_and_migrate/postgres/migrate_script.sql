CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200603123102_InitCreate') THEN
    CREATE TABLE "MyCodes" (
        "Id" serial NOT NULL,
        "Name" text NULL,
        "NameEn" text NULL,
        "NameCn" text NULL,
        CONSTRAINT "PK_MyCodes" PRIMARY KEY ("Id")
    );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20200603123102_InitCreate') THEN
    INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
    VALUES ('20200603123102_InitCreate', '2.2.6-servicing-10079');
    END IF;
END $$;
