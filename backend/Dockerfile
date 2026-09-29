FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

RUN cp target/tracker-*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]