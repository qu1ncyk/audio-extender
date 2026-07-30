{
  description = "audio-extender";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in rec {
        # https://nixos.org/manual/nixpkgs/stable/#javascript-buildNpmPackage-importNpmLock.buildNodeModules
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            importNpmLock.hooks.linkNodeModulesHook
            nodejs
          ];
          npmDeps = pkgs.importNpmLock.buildNodeModules {
            npmRoot = ./.;
            inherit (pkgs) nodejs;
          };
        };

        packages.default = pkgs.buildNpmPackage {
          pname = "audio-extender";
          version = "1.0.0";
          src = ./.;

          npmDeps = pkgs.importNpmLock {npmRoot = ./.;};
          npmConfigHook = pkgs.importNpmLock.npmConfigHook;

          buildPhase = ''
            mkdir -p public/build
            npm run prepare
            npm run build
          '';

          installPhase = ''
            mv public $out
          '';
        };

        packages.serve = pkgs.pkgs.writeShellScriptBin "audio-extender" ''
          ${pkgs.http-server}/bin/http-server ${packages.default}
        '';
      }
    );
}
