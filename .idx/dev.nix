nix
{pkgs, ...}:

{
  environment.systemPackages = with pkgs; [
    sudo
  ];
}