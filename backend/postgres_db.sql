-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


-- CREATE TABLE IF NOT EXISTS public."ACHIEVEMENTS"
-- (
--     user_id integer NOT NULL,
--     achievement_id serial NOT NULL,
--     CONSTRAINT "ACHIEVEMENTS_pkey" PRIMARY KEY (achievement_id)
-- );

CREATE TABLE IF NOT EXISTS public."BLOCKED"
(
    blocked_user_id integer NOT NULL,
    date timestamp with time zone NOT NULL DEFAULT now(),
    user_id integer NOT NULL
);

-- CREATE TABLE IF NOT EXISTS public."CHAT_MESSAGE"
-- (
--     chat_room_id integer NOT NULL,
--     user_id integer NOT NULL,
--     content text COLLATE pg_catalog."default" NOT NULL,
--     sent_time timestamp with time zone NOT NULL DEFAULT now()
-- );

CREATE TABLE IF NOT EXISTS public."CHAT_PARTICIPANT"
(
    user_id integer NOT NULL,
    chat_room_id integer NOT NULL,
    role chat_participant_roles NOT NULL DEFAULT 'guest'::chat_participant_roles,
    is_banned boolean NOT NULL DEFAULT false,
    is_muted boolean NOT NULL DEFAULT false,
    entrance_time timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public."CHAT_ROOM"
(
    title character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default",
    type chat_room_types NOT NULL DEFAULT 'public'::chat_room_types,
    creation_date timestamp with time zone NOT NULL DEFAULT now(),
    chat_room_id serial NOT NULL,
    CONSTRAINT "CHAT_ROOM_pkey" PRIMARY KEY (chat_room_id)
        INCLUDE(chat_room_id)
);

CREATE TABLE IF NOT EXISTS public."FRIENDS"
(
    person1_user_id integer NOT NULL,
    person2_user_id integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public."GAME"
(
    player1_user_id integer NOT NULL,
    player2_user_id integer NOT NULL,
    winner_user_id integer,
    is_ladder_game boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS public."USER"
(
    nickname character varying COLLATE pg_catalog."default",
    avatar bytea NOT NULL,
    is_second_auth_done boolean NOT NULL DEFAULT false,
    second_auth_code smallint,
    second_auth_email character varying COLLATE pg_catalog."default",
    ladder_level integer NOT NULL DEFAULT 0,
    user_status user_status NOT NULL DEFAULT 'offline'::user_status,
    user_id serial NOT NULL,
    CONSTRAINT "USER_pkey" PRIMARY KEY (user_id)
        INCLUDE(user_id)
);

ALTER TABLE IF EXISTS public."ACHIEVEMENTS"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."BLOCKED"
    ADD CONSTRAINT fk_blocked_user_id FOREIGN KEY (blocked_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."BLOCKED"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CHAT_MESSAGE"
    ADD CONSTRAINT fk_chat_room_id FOREIGN KEY (chat_room_id)
    REFERENCES public."CHAT_ROOM" (chat_room_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CHAT_MESSAGE"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CHAT_PARTICIPANT"
    ADD CONSTRAINT fk_chat_room_id FOREIGN KEY (chat_room_id)
    REFERENCES public."CHAT_ROOM" (chat_room_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."CHAT_PARTICIPANT"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."FRIENDS"
    ADD CONSTRAINT fk_person1_user_id FOREIGN KEY (person1_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."FRIENDS"
    ADD CONSTRAINT fk_person2_user_id FOREIGN KEY (person2_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."GAME"
    ADD CONSTRAINT fk_player1_user_id FOREIGN KEY (player1_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."GAME"
    ADD CONSTRAINT fk_player2_user_id FOREIGN KEY (player2_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."GAME"
    ADD CONSTRAINT fk_winner_user_id FOREIGN KEY (winner_user_id)
    REFERENCES public."USER" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;