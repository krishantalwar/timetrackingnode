
CREATE SCHEMA IF NOT EXISTS spot;

CREATE TABLE spot.qs_user (
    userid integer NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    user_referral_code character varying,
    referral_code character varying,
    email_notification boolean,
    user_info jsonb,
    status smallint,
    created_by character varying,
    created_on timestamp without time zone,
    modified_by character varying,
    modified_on timestamp without time zone
);


CREATE SEQUENCE spot.qs_user_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     
ALTER SEQUENCE spot.qs_user_userid_seq OWNED BY spot.qs_user.userid;

Alter Table spot.qs_user add column resetLink character varying
Alter Table spot.qs_user add column verification_status boolean
Alter Table spot.qs_user add column verification_code character varying
Alter Table spot.qs_user add column user_type character varying

CREATE TABLE spot.qs_admin (
    userid integer NOT NULL,
    username character varying,
    email character varying,
    password character varying,
    modified_on timestamp without time zone
)



INSERT into spot.qs_lookup_info  (qs_lookup_key, qs_lookup_desc, qs_lookup_info, created_on, qs_lookup_id) VALUES('qs_category', 'quick spot categories', null, null,  nextval(pg_get_serial_sequence('spot.qs_lookup_info', 'qs_lookup_id')));
ALTER TABLE spot.qs_lookup_info RENAME COLUMN qs_lookup_info TO qs_lookup_details;
  ALTER TABLE spot.qs_lookup_info ALTER COLUMN qs_lookup_details TYPE character varying;

  ALTER TABLE spot.qs_lookup_info ALTER COLUMN qs_lookup_details TYPE JSONB USING qs_lookup_details::JSONB;




SELECT          "Spot"."quickspot_id",
                "Spot"."qs_name",
                "Spot"."qs_type_id",
                "Spot"."qs_style_id",
                "Spot"."qs_charges",
                "Spot"."qs_images",
                "Spot"."staus",
                "Spot"."created_userid",
                "Spot"."created_by",
                "Spot"."modified_by",
                "Spot"."created_on",
                "Spot"."modified_on",
                "qs_style"."qs_lookup_id"         AS "qs_style.qs_lookup_id",
                "qs_style"."qs_lookup_key"        AS "qs_style.qs_lookup_key",
                "qs_style"."qs_lookup_desc"       AS "qs_style.qs_lookup_desc",
                "qs_style"."qs_lookup_details"    AS "qs_style.qs_lookup_details",
                "qs_style"."status"               AS "qs_style.status",
                "qs_style"."created_by"           AS "qs_style.created_by",
                "qs_style"."modified_by"          AS "qs_style.modified_by",
                "qs_style"."deleted_by"           AS "qs_style.deleted_by",
                "qs_style"."is_deleted"           AS "qs_style.is_deleted",
                "qs_style"."created_on"           AS "qs_style.created_on",
                "qs_style"."modified_on"          AS "qs_style.modified_on",
                "qs_category"."qs_lookup_id"      AS "qs_category.qs_lookup_id",
                "qs_category"."qs_lookup_key"     AS "qs_category.qs_lookup_key",
                "qs_category"."qs_lookup_desc"    AS "qs_category.qs_lookup_desc",
                "qs_category"."qs_lookup_details" AS "qs_category.qs_lookup_details",
                "qs_category"."status"            AS "qs_category.status",
                "qs_category"."created_by"        AS "qs_category.created_by",
                "qs_category"."modified_by"       AS "qs_category.modified_by",
                "qs_category"."deleted_by"        AS "qs_category.deleted_by",
                "qs_category"."is_deleted"        AS "qs_category.is_deleted",
                "qs_category"."created_on"        AS "qs_category.created_on",
                "qs_category"."modified_on"       AS "qs_category.modified_on",
                "user"."userid"                   AS "user.userid",
                "user"."user_info"                AS "user.user_info"
FROM            "spot"."qs_my_quickspot"          AS "Spot"
INNER JOIN      "spot"."qs_lookup_info"           AS "qs_style"
ON              "Spot"."qs_style_id" = "qs_style"."qs_lookup_id"
LEFT OUTER JOIN "spot"."qs_lookup_info" AS "qs_category"
ON              "Spot"."qs_type_id" = "qs_category"."qs_lookup_id"
LEFT OUTER JOIN "spot"."qs_user" AS "user"
ON              "Spot"."created_userid" = "user"."userid"
WHERE           (
                                "Spot"."qs_name" ilike '%Style 2%'
				or
				(qs_style.qs_lookup_details->>'title') ilike '%Style 2%'
				or
				(qs_category.qs_lookup_details->>'title') ilike '%Style 2%'
				OR
				("user".user_info->>'firstname') ilike '%Style 2%'
				OR
				("user".user_info->>'lastname') ilike '%Style 2%'
				)
ORDER BY        "Spot"."created_on" DESC limit 10 offset 0