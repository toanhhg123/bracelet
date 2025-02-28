ALTER TABLE `cart` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;