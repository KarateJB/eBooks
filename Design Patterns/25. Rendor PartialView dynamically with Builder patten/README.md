
dotnet new mvc --name DP.Website
dotnet sln DP.sln add DP.Website/DP.Website.csproj
cd DP.Website
dotnet restore
dotnet build  