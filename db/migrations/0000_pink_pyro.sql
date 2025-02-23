CREATE TABLE `product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`cover_image` varchar(500) NOT NULL,
	`current_price` float NOT NULL,
	`previous_price` float,
	`category` varchar(255),
	`rating` float NOT NULL,
	`reviews` int NOT NULL,
	`pieces_sold` int NOT NULL,
	`just_in` boolean DEFAULT false,
	`shots` json,
	`overview` text,
	`shipment_details` json,
	CONSTRAINT `product_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`age` int,
	`password` varchar(255) NOT NULL,
	`address` text,
	`avatar` varchar(255),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
