CREATE TABLE `order_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`price` float NOT NULL,
	`notes` text,
	`product_details` json,
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`contact_phone` varchar(20) NOT NULL,
	`shipping_address_line1` varchar(255) NOT NULL,
	`shipping_address_line2` varchar(255),
	`shipping_city` varchar(100) NOT NULL,
	`shipping_state` varchar(100),
	`shipping_postal_code` varchar(20) NOT NULL,
	`shipping_country` varchar(100) NOT NULL,
	`address_type` varchar(50),
	`payment_method` varchar(255) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`total_price` float NOT NULL,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;