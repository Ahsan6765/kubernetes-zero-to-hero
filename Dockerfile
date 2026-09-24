# FROM python:3.12-slim

# # Keep Python from creating unnecessary files and buffers.
# ENV PYTHONDONTWRITEBYTECODE=1 \
# 	PYTHONUNBUFFERED=1


# WORKDIR /app

# # Install dependencies first so this layer remains cacheable.
# COPY requirements.txt ./
# RUN pip install --no-cache-dir --disable-pip-version-check -r requirements.txt

# COPY . .

# # Run as a non-root user.
# RUN useradd --create-home --uid 10001 appuser && \
# 	chown -R appuser:appuser /app
# USER appuser

# EXPOSE 8000

# CMD ["python", "app.py"]



FROM nginx:alpine

COPY application/ /usr/share/nginx/html/

EXPOSE 80
