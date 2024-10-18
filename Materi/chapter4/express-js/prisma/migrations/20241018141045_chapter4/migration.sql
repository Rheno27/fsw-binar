-- CreateTable
CREATE TABLE "classes" (
    "id" BIGSERIAL NOT NULL,
    "class" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "nick_name" VARCHAR(255),
    "profile_picture" TEXT,
    "class_id" BIGINT,
    "university_id" BIGINT,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "city" VARCHAR(255),
    "country" VARCHAR(255),

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
