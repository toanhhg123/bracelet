CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_name_unique` UNIQUE(`name`),
	CONSTRAINT `category_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `product` ADD `category_id` int;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `category`;