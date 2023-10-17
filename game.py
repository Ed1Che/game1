import pygame
import sys

# Initialize Pygame
pygame.init()

# Set up the game window
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Eclipse Game")

# Colors
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)
BLACK = (0, 0, 0)

# Eclipse variables
sun_radius = 100.0
moon_radius = 50.0
sun_pos = (width // 2, height // 2)
moon_pos = (width // 2, height // 2 - 250)
eclipse_complete = False


# Game loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Clear the screen
    screen.fill(WHITE)

    # Draw the sun
    pygame.draw.circle(screen, YELLOW, sun_pos, sun_radius)

    # Draw the moon
    pygame.draw.circle(screen, BLACK, moon_pos, moon_radius)

    # Calculate the distance between the moon and the sun
    distance = ((moon_pos[0] - sun_pos[0]) * 2 + (moon_pos[1] - sun_pos[1]) * 2) * 0.5

    # Check if the moon is in front of the sun (eclipse condition)
    if distance < sun_radius - moon_radius:
        pygame.draw.circle(screen, WHITE, sun_pos, sun_radius - moon_radius)
        eclipse_complete = True

    # Display eclipse message
    if eclipse_complete:
        font = pygame.font.Font(None, 36)
        text = font.render("Congratulations! You witnessed a solar eclipse!", True, BLACK)
        text_rect = text.get_rect(center=(width // 2, height // 2 + 200))
        screen.blit(text, text_rect)

    # Update the display
    pygame.display.flip()